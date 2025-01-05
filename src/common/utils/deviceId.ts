export const generateDeviceId = () => {
  let deviceId = localStorage.getItem("deviceId");

  if (!deviceId) {
    deviceId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (char) {
        const randomNum = (Math.random() * 16) | 0;
        const uuidValue = char == "x" ? randomNum : (randomNum & 0x3) | 0x8;
        return uuidValue.toString(16);
      }
    );
    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};
