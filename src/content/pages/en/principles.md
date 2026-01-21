---
title: "Technical Principles" 
description: "Design, architecture, and development criteria"
---

# Technical Principles

These principles define **how I make technical decisions**: from architecture and dependencies to security, testing, and deployment. They are not abstract ideals; they are rules applied in real-world projects.

---

## ***Core Principles***

### *1. Security by Design*

Security is not an afterthought.

It is engineered into the architecture from the start:

* Attack surface minimization
* Early and explicit validation
* Principle of least privilege
* Secure-by-default failures

---

### *2. Privacy and Responsible Use*

Collect, process, and store **only what is strictly necessary**.

* Personal data treated as a critical liability
* Tools oriented toward ethical auditing and learning
* Avoiding designs that facilitate abuse or unjustified mass extraction

---

### *3. Explicitly Justified Dependencies*

Every dependency introduces operational risk.

* No library is added without a clear, measurable benefit
* Preference for simple, auditable solutions
* Fewer dependencies = smaller failure and attack surface

---

### *4. Observability and Traceability*

A system that cannot be observed cannot be operated or secured.

* Structured logs
* Relevant metrics
* Traceability for debugging and reproducible audits

---

### *5. Maintainable Simplicity*

Complexity is technical debt.

* Readable code over "clever" code
* Continuous refactoring
* Architectures that can be explained without complex diagrams

---

## ***Applied Security***

### *Attack Surface Evaluation*

Before protecting, one must understand what exists.

* Passive reconnaissance
* Configuration analysis
* Detection of exposed services
* Controlled technological fingerprinting

---

### *Identity and Access Management (IAM)*

Authentication and authorization are distinct and critical problems.

* JWT and sessions based on context
* RBAC (Role-Based Access Control) with explainable rules
* Access auditing
* Credential revocation and rotation

---

## ***Robust Backend***

### *API Design*

An API is both a technical and operational contract.

* Correct HTTP semantics
* Versioning from the start
* OpenAPI documentation
* Rate limiting and abuse control

---

## ***Pragmatic Testing***

I don't aim for perfect coverage. I aim for **real confidence**.

* **Unit Testing**: Business logic
* **Integration Testing**: Contracts between components
* **E2E Testing**: Critical user flows
* **Security Testing**: Authentication and authorization where applicable

---

## ***DevOps and Continuous Delivery***

* Automation of builds and tests
* Containers for reproducible environments
* CI/CD with GitHub Actions
* Code review as a mandatory quality control

---

## ***Professional Responsibility***

The impact of software matters.

* Ethical use of security tools
* Explicit protection of sensitive data
* Accessibility as a requirement, not an extra

---

These principles guide all my [projects](https://www.google.com/search?q=projects).
