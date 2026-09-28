export function qualifyLead(lead) {
  if (!lead || typeof lead !== "object") {
    return { eligible: false, reason: "invalid-input" };
  }

  const email = typeof lead.email === "string" ? lead.email.trim() : "";
  const companySize = Number(lead.companySize ?? 0);

  if (!email.includes("@")) return { eligible: false, reason: "invalid-email" };
  if (companySize < 5) return { eligible: false, reason: "below-threshold" };

  return { eligible: true, email: email.toLowerCase(), companySize };
}

export async function runLeadWorkflow(lead, {
  actionImpl,
  verifyImpl,
} = {}) {
  const decision = qualifyLead(lead);
  if (!decision.eligible) {
    return { status: "ABSTAINED", decision };
  }
  if (typeof actionImpl !== "function") {
    throw new Error("actionImpl is required");
  }
  if (typeof verifyImpl !== "function") {
    throw new Error("verifyImpl is required");
  }

  const action = await actionImpl(decision);
  const observation = await verifyImpl(action);

  return {
    status: observation.ok ? "VERIFIED" : "UNVERIFIED",
    decision,
    action,
    observation,
  };
}
