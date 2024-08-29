export type RootStackParamList = {
    Welcome: undefined;
    Login: undefined;
    ForgetPassword: undefined;
    NewPasswordScreen: undefined;
    SignUp: undefined;
    Verify: {verificationCode: string};
    OnBoardingScreen:undefined;
    HomePage:undefined;
    BottomTabs:undefined;
    ProfilePage:undefined;
    FavoritePage:undefined;
    SearchPage:undefined;
    ProductDetail: { productId: string };
    StoryView:{ storyId: string};
  };
  