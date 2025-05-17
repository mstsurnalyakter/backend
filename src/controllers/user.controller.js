import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";

const generateAccessTokenAndRefereshToken = async (userId) => {
  try {
    const user = await User.find(userId);
    const accessToken = user.generateRefreshToken();
    const refreshToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token."
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend

  const { fullName, email, username, password } = req.body;
  //validataion-not empty
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All field are required");
  }

  //check if user already exist
  const existerUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existerUser) {
    throw new ApiError(409, "User with or username already exists.");
  }

  //check for image, check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // console.log(req.files)
  // const coverImageLocalPath =req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files?.coverImage[0]?.path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }
  //upload them to cloudinary,avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  //create user object - create entry in db
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });
  //check fro user creation
  //remove password and refres token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user.");
  }

  //return res
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully."));
});

const loginUser = asyncHandler(async (req, res) => {
  // req boby -> data
  const { email, username, password } = req.body;
  if (!username || !email) {
    throw new ApiError(400, "username or email required");
  }

  //find the user
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(404, "User does not exist.");
  }

  // password check
  const isPasswordVlaid = await user.isPasswordCorrect(password);
  if (!isPasswordVlaid) {
    throw new ApiError(401, "Invalid user credentials");
  }
  //access and refresh token
  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefereshToken(user._id);

  const loginedUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  //send cookie
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loginUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );
   const options = {
      httpOnly:true,
      secure:true
    }
     return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"))
});

export { registerUser, loginUser, logoutUser };
