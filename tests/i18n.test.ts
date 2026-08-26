import { describe, expect, it } from "vitest";
import { localizePlanText, translate } from "../lib/i18n";

describe("Chinese localization",()=>{
  it("translates core workflow labels",()=>{
    expect(translate("Learner","zh")).toBe("学习者");
    expect(translate("Scaffold Plan","zh")).toBe("支架方案");
  });
  it("preserves English when selected",()=>expect(translate("Learner","en")).toBe("Learner"));
  it("localizes task-specific recommendations while retaining vocabulary",()=>{
    expect(localizePlanText("Visual word bank: erosion, surface, evidence","zh")).toBe("图文词汇库：erosion, surface, evidence");
    expect(localizePlanText("Use a cause → effect organizer tied to this objective","zh")).toContain("原因 → 结果");
  });
});
