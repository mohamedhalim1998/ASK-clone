const ProfileImage = (url?: string) => {
  return (
    <div
      className="rounded-full bg-center w-10 h-10 bg-cover"
      style={{
        backgroundImage: ` url(http://localhost:8080/image/${url ? url : "blank-profile-pic.png"})`,
      }}
    />
  );
};
export default ProfileImage;
