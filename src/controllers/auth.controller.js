const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const logger = require('../config/logger');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);

  // Creates Secure Cookie with refresh token
  const refreshToken = tokens.refresh;
  const accessToken = tokens.access;
  res.status(httpStatus.CREATED).send(
    { user, tokens }
      .cookie('refresh_jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie('access_jwt', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
  );
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithUsernameAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);

  // Creates Secure Cookie with refresh token
  const accessToken = tokens.access;
  const refreshToken = tokens.refresh;

  res
    .cookie('refresh_jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
    .cookie('access_jwt', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
    .send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
  // Get token from Secure Cookie
  const { cookies } = req;
  const refreshToken = cookies.refresh_jwt.token;
  await authService.logout(refreshToken);
  res.clearCookie('refresh_jwt').clearCookie('access_jwt').status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  // Get token from Secure Cookie
  const { cookies } = req;
  if (cookies === undefined || !cookies) return res.sendStatus(401);
  const refreshToken = cookies.refresh_jwt.token;
  const tokens = await authService.refreshAuth(refreshToken);

  // Creates Secure Cookie with refresh token
  const accessTokenNew = tokens.access;
  const refreshTokenNew = tokens.refresh;
  res
    .cookie('access_jwt', accessTokenNew, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 24 * 60 * 60 * 1000 })
    .cookie('refresh_jwt', refreshTokenNew, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })
    .send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
};
