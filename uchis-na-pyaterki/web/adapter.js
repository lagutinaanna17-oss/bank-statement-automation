/* Версия для своего домена: вместо Claude страница обращается к серверу сайта. Подключается сервером автоматически. */
window.SITE = (() => {
  const api = async (path, body, signal) => {
    let r;
    try {
      r = await fetch(path, body === undefined
        ? {credentials: "same-origin", signal}
        : {method: "POST", credentials: "same-origin", signal, headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)});
    } catch (e) { throw {code: e && e.name === "AbortError" ? "cancelled" : "upstream_error"}; }
    let data = null;
    try { data = await r.json(); } catch (e) {}
    if (!r.ok) throw {code: (data && data.error) || "upstream_error", status: r.status};
    return data;
  };
  let timer = null;
  const site = {
    api, me: null,
    refresh: () => api("/api/me").then(m => (site.me = m), () => (site.me = null)),
    /* прогресс вошедшего ученика сохраняется на сервере, чтобы он был виден с любого устройства */
    push: store => {
      if (!site.me || !site.me.user) return;
      clearTimeout(timer);
      timer = setTimeout(() => api("/api/progress", store).catch(() => {}), 1500);
    }
  };
  site.ready = site.refresh();
  return site;
})();
(() => {
  const sample = async (input, opts = {}) => {
    const meta = opts.meta || {};
    const turns = Array.isArray(input) ? input.slice(1) : [{role: "user", content: String(input)}];   // первую реплику с правилами сервер составляет сам
    const d = await SITE.api("/api/teacher", {grade: meta.grade, subj: meta.subj, turns}, opts.signal);
    if (opts.onText && !(opts.signal && opts.signal.aborted)) opts.onText({text: d.text, delta: d.text});
    return {text: d.text, truncated: false};
  };
  sample.json = (input, opts = {}) => {
    const m = opts.meta || {};
    return SITE.api(`/api/lesson?grade=${encodeURIComponent(m.grade)}&subj=${encodeURIComponent(m.subj)}&i=${encodeURIComponent(m.i)}`, undefined, opts.signal);
  };
  window.claude = {use: async name => (name === "sample" ? sample : null)};
})();
