let mainText = document.querySelector("h1");
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);

  return tab;
}

getCurrentTab().then((data) => {
  if (data.url.includes("youtube.com/watch")) {
    fetch("http://localhost:4200/transcribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "akshajb@gmail.com",
        url: data.url,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        mainText.innerText = JSON.stringify(res.video_url);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    mainText.innerText = "Not on Youtube currently";
  }
});
