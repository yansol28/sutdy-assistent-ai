# Research: Local Study Progress Persistence

**Feature**: Save Study Progress | **Date**: 2026-07-16

## Technical Decisions & Rationale

- **Decision**: Use browser's `window.localStorage` API.
- **Rationale**: Meets requirement for client-side, zero-library persistence, suitable for simple state-saving of study progress.
- **Alternatives considered**: `IndexedDB` (too complex for this requirement), `Cookies` (too small, not ideal for structured state), `sessionStorage` (lost on tab refresh, violates requirement).

## Implementation Details

- **Key Generation**: To avoid collisions and ensure persistence across sessions for the same input parameters, keys will be generated using a template: `progress:{tema}:{tempo}:{nomeTopico}`. The `:` acts as a separator. Input strings will be sanitized (e.g., whitespace normalization) to ensure consistency.
- **State Serialization**: `localStorage` only stores strings. State for each topic will be stringified booleans (`"true"`/`"false"`).
- **Error Handling**: 
    - `localStorage` can be full (rarely) or disabled (private browsing). Implement a `try-catch` wrapper around `setItem` to handle potential exceptions gracefully.
- **Performance**: `localStorage` operations are synchronous but extremely fast for this small dataset size. No asynchronous handling required.
