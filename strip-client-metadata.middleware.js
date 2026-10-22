// Remove Codex/OpenAI Responses client_metadata only for selected Magpie providers.
// Configure providerIds in this plugin's Options in Magpie.
export function onProvider(body, ctx) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return;
  if (ctx.protocol !== "responses") return;

  const providerIds =
    ctx.options && Array.isArray(ctx.options.providerIds)
      ? ctx.options.providerIds
      : [];
  const providerId = ctx.provider && ctx.provider.id;

  if (typeof providerId !== "string" || !providerIds.includes(providerId)) {
    return;
  }

  if (!Object.prototype.hasOwnProperty.call(body, "client_metadata")) return;

  const updatedBody = { ...body };
  delete updatedBody.client_metadata;
  return updatedBody;
}
