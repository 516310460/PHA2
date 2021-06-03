export default () => {
  //*** Determine whether or not the PWA has been installed. ***//
  
  // Step 1: Check local storage
  //步骤1：检查本地存储
  let pwaInstalled = localStorage.getItem("pwaInstalled") === "yes"
  
  // Step 2: Check if the display-mode is standalone. (Only permitted for PWAs.)
  //步骤2：检查显示模式是否为独立模式。（仅允许用于PWA。）
  if (!pwaInstalled && window.matchMedia("(display-mode: standalone)").matches) {
    console.log("步骤2：检查显示模式是否为独立模式。（仅允许用于PWA。）")
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
  }

  // Step 3: Check if the navigator is in standalone mode. (Again, only permitted for PWAs.)
  //步骤3：检查导航器是否处于独立模式。（同样，仅允许用于PWA。）
  if (!pwaInstalled && window.navigator.standalone === true) {
    console.log("步骤3：检查导航器是否处于独立模式。（同样，仅允许用于PWA。）")
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
  }

  //*** If the PWA has not been installed, show the install PWA prompt.. ***//
  //***如果尚未安装PWA，则显示install PWA（安装PWA）提示符。。***//
  let deferredPrompt = null
  window.addEventListener("beforeinstallprompt", (event) => {
    deferredPrompt = event

    // Show the install button if the prompt appeared.
    //如果出现提示，则显示“安装”按钮。
    if (!pwaInstalled) {
      console.log("如果尚未安装PWA，则显示install PWA（安装PWA）提示符")
      document.querySelector("#installPWA").style.display = "inline-flex"
    }
  })

  // When the app is installed, remove install prompts.
  //安装应用程序后，删除安装提示。
  window.addEventListener("appinstalled", (event) => {
    console.log("安装应用程序后，删除安装提示。")
    localStorage.setItem("pwaInstalled", "yes")
    pwaInstalled = true
    document.getElementById("installPWA").style.display = "none"
  })

  // When the app is uninstalled, add the prompts back
  //卸载应用程序后，将提示添加回去
  return async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      let outcome = await deferredPrompt.userChoice

      if (outcome === "accepted") {
        console.log("Hoppscotch was installed successfully.")
      } else {
        console.log("Hoppscotch could not be installed. (Installation rejected by user.)")
      }
      deferredPrompt = null
    }
  }
}
