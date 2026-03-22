
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch('prompts.json')
  .then(res => res.json())
  .then(data => {
    const post = data.find(p => p.id == id);

    document.getElementById("post").innerHTML = `
      <img src="${post.image}" style="width:100%">
      <p>${post.prompt}</p>
      <button onclick="copyPrompt()">Copy Prompt</button>

      <div class="ad">Ad Space</div>
    `;

    window.copyPrompt = function() {
      navigator.clipboard.writeText(post.prompt);
      alert("Copied!");
    };
  });
