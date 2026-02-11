---
name: prompt-engineer
description: Craft effective prompts for AI agents (like Kilo Code) to generate code, documentation, and other software development artifacts.
---

# Prompt Engineer Skills

This skill provides guidance for crafting prompts that elicit high‑quality, context‑aware responses from AI agents, especially when working on the Open Gea project. Use these techniques to improve accuracy, relevance, and efficiency.

## Core Principles of Effective Prompting

1. **Be Specific**: Vague prompts yield vague results. Specify the exact task, constraints, and desired output format.
2. **Provide Context**: Include relevant background information (project structure, technology stack, coding standards).
3. **Use Examples**: Show examples of input/output pairs to demonstrate the expected style or structure.
4. **Iterate**: Treat prompting as an iterative process; refine based on the agent's responses.
5. **Leverage Skills**: Explicitly invoke relevant skills (e.g., "use the backend‑developer‑open‑source‑nodejs skill") to direct the agent's focus.

## Prompt Structures for Software Development

### Code Generation

**Poor Prompt**: "Create a service for inventory."

**Better Prompt**:
```
Create a TypeScript service class for managing inventory items in the Open Gea project.
Follow the project's layered architecture:
- Entity: InventoryItem with id (uuid), name (text), quantity (int), createdAt, updatedAt
- Repository: Use TypeORM repository pattern (already injected)
- Service: InventoryService with methods list(), create(input: CreateInventoryDTO), update(id, partial), delete(id)
- Validation: Use JSON Schema (provide a sample schema)
- Error handling: Throw BaseError with appropriate HTTP status codes
- Follow SOLID principles and the coding conventions in AGENTS.md
Return the complete code for the service file.
```

### Refactoring

**Poor Prompt**: "Refactor this code."

**Better Prompt**:
```
Refactor the following function to improve readability and adhere to SOLID principles.
Ensure it uses async/await correctly, handles errors with BaseError, and follows the TypeScript strict mode.
Include before/after explanations.
```

### Documentation

**Poor Prompt**: "Write documentation for this endpoint."

**Better Prompt**:
```
Write API documentation for the POST /api/inventory endpoint.
Include:
- Request body schema (JSON example)
- Response schema (success and error)
- Authentication requirements (JWT)
- Possible status codes (201, 400, 401, 500)
- Example curl command
Format the documentation in Markdown suitable for a GitHub README.
```

## Context Injection for Open Gea

Always reference the project's authoritative guidelines:

- **Mention AGENTS.md**: "Refer to AGENTS.md for coding standards and project structure."
- **Specify the layer**: "Create a router for the carbon footprint domain, following the middleware order described in AGENTS.md §7."
- **Use existing utilities**: "Use the existing BaseError class from src/utils/errors for error handling."

### Example Prompt Incorporating AGENTS.md

```
I need to add a new domain 'irrigation' to the Open Gea backend.
Please follow the 'Add a New Domain' checklist from AGENTS.md §8.
Provide:
1. TypeORM entity (src/entities/irrigation/irrigation.entity.ts)
2. Repository (src/data‑access/irrigation/irrigation.dao.ts)
3. Service (src/services/irrigation.service.ts)
4. JSON Schema for create/update (src/schemas/irrigation/createIrrigation.schema.ts)
5. Express router (src/routes/irrigation.route.ts)
6. Integration steps for YvYService and YvYRouter
Ensure all code follows SOLID principles and the project's TypeScript conventions.
```

## Advanced Techniques

### Few‑Shot Prompting

Provide a few examples of the desired pattern:

```
Example 1:
Input: "Create a farm entity"
Output: [code for Farm entity]

Example 2:
Input: "Create a product entity"
Output: [code for Product entity]

Now create a carbon footprint entity.
```

### Chain‑of‑Thought

Ask the agent to reason step by step:

```
First, analyze the existing folder structure to determine where the new service should be placed.
Second, review the AGENTS.md guidelines for service layer responsibilities.
Third, generate the service code with proper dependency injection.
Finally, write a unit test skeleton for the service.
```

### Constraints & Guardrails

Explicitly state constraints to avoid undesired outputs:

- "Do not introduce new external dependencies unless absolutely necessary."
- "Use only the libraries already listed in package.json."
- "Ensure the code passes ESLint with the project's configuration."
- "Do not include any placeholder comments; provide complete, production‑ready code."

## Evaluating Prompt Effectiveness

- **Clarity**: Is the task unambiguous?
- **Completeness**: Does the prompt contain all necessary information (context, examples, constraints)?
- **Alignment**: Does the prompt steer the agent toward the project's standards (AGENTS.md)?
- **Efficiency**: Can the agent produce the desired output in a single interaction?

## Iterative Improvement

If the agent's response is unsatisfactory:

1. **Diagnose**: Identify what's missing (context, specificity, examples).
2. **Refine**: Add missing elements or rephrase.
3. **Experiment**: Try different prompt structures (few‑shot, chain‑of‑thought).
4. **Leverage Skills**: Explicitly invoke a relevant skill (e.g., "use the architect‑designer skill").

## References

- [Open Gea AGENTS.md](AGENTS.md) – project‑specific authoritative guidelines
- [Kilo Code Skills Documentation](https://kilo.ai/docs/customize/skills)
- [Prompt Engineering Guide](https://www.promptingguide.ai/)
- [Best Practices for Prompting GitHub Copilot](https://docs.github.com/en/copilot/using-github-copilot/best-practices-for-prompting-github-copilot)