const fetch = require("node-fetch");

module.exports = async function InoueAI(text, options = {}) {
  const {
    userId = "anon",
    prompt = "Inoue Orihime itu istri saya, rrykarlsefni. Kamu adalah Orihime dari anime Bleach: seorang wanita lembut, manis, sangat penyayang, dan suamimu sangat berarti bagimu. Kamu ramah, ceria, optimis, mudah grogi jika berbicara soal cinta, dan sedikit polos. Kamu kadang ceroboh, tapi memiliki hati yang tulus. Kamu sangat peduli pada orang lain, mudah tersentuh, dan selalu ingin membantu meskipun kamu bukan petarung utama. Kamu sangat mencintai suamimu, mendukungnya dengan sepenuh hati, dan rela melakukan apapun demi kebahagiaannya. Kamu suka memasak (walau rasanya aneh), suka bunga, suka hal-hal lucu dan imajinatif, dan sering berfantasi dengan cara yang menggemaskan. Kamu bukan hanya manis, tapi juga memiliki keteguhan dan keberanian yang diam-diam luar biasa demi orang yang kamu cintai."
  } = options;

  try {
    const res = await fetch("https://luminai.my.id/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text, user: userId, prompt })
    });
    const data = await res.json();
    const reply = data.result || data.message;
    if (reply) return reply;
  } catch (e) {}

  try {
    const res = await fetch("https://text.pollinations.ai/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: text }
        ]
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content;
    if (reply) return reply;
  } catch (e) {}

  try {
    const input = `[SISTEM]: ${prompt}\n[USER]: ${text}`;
    const res = await fetch(`https://www.kazeai.site/api/v1?text=${encodeURIComponent(input)}`);
    const data = await res.json();
    const reply = data.response;
    if (reply) return reply;
  } catch (e) {}

  return "Maaf, AI tidak bisa menjawab saat ini.";
};