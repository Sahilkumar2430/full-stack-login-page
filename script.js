document.getElementById("appForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value
  };

  const res = await fetch("http://localhost:5000/api/apply", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  if (result.message === "Application submitted successfully!") {
    // Redirect to dashboard.html
    window.location.href = "dashboard.html";
  } else {
    //  Show error
    document.getElementById("response").innerText = result.message;
  }
});
