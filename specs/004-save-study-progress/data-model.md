# Data Model: Save Study Progress

**Feature**: Save Study Progress | **Date**: 2026-07-16

## Entities

### ProgressItem
- **Key**: `progress:{tema}:{tempo}:{nomeTopico}`
- **Value**: `"true"` (estudado) | `"false"` (não estudado)
- **Scope**: Local to the user's browser for specific study sessions.

## State Transitions

- **Unchecked** -> (Click) -> **Checked** -> `localStorage.setItem(key, "true")` -> UI update (check + progress count)
- **Checked** -> (Click) -> **Unchecked** -> `localStorage.setItem(key, "false")` -> UI update (uncheck + progress count)

## UI State
- The render process for topics must:
    1. Read the key `progress:{tema}:{tempo}:{nomeTopico}` from `localStorage`.
    2. Set checkbox state accordingly (`checked = (value === "true")`).
- The progress indicator ("X de Y tópicos estudados") must:
    1. Be initialized based on the count of topics with value `"true"` in `localStorage`.
    2. Be updated on each change.
