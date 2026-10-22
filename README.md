# Magpie: strip Responses `client_metadata`

A Magpie gateway middleware that removes the top-level `client_metadata` field
from OpenAI Responses requests sent to provider IDs selected in the plugin's
options. Other protocols and providers pass through unchanged.

## Requirements

Magpie **0.1.1283 or newer** is required for the `onProvider` hook, which exposes
the provider selected for each routing attempt.

## Install locally

From this directory's parent, install the plugin by path:

```sh
magpie plugin add ./magpie-strip-client-metadata
```

Then open **Settings → Plugins → Installed → Options** and set `providerIds` to
the exact Magpie provider IDs to filter, for example:

```json
{
  "providerIds": ["provider-id-a", "provider-id-b"]
}
```

You can set the same options from a terminal:

```sh
magpie plugin options strip-client-metadata \
  '{"providerIds":["provider-id-a","provider-id-b"]}'
```

Use the provider IDs shown by `magpie providers`, not display names or model
IDs. An empty list is a no-op. Magpie's manifest options are an editor starting
value; save the provider list in the Options editor before relying on it.

## Behavior and limitation

The hook runs once for each provider attempt, so a routing group can strip the
field for selected members while leaving it intact for other members. It removes
only `client_metadata`; it does not alter the model, tool state, other metadata,
or Responses fields.

Magpie middleware fails open: if a hook throws or exceeds its time limit, the
request continues unchanged. Treat this as best-effort filtering, and verify the
outbound body for the providers you target. Some relays may rely on
`client_metadata`, so check their behavior without it.
