import { describe, expect, it } from "vitest";
import { activities, canDoTasks, getCanDoProfile } from "../data/cando";

describe("Can-Do Explorer content",()=>{
  it("covers every classroom task with a complete example",()=>{
    for(const task of canDoTasks){
      expect(activities[task].title).toBeTruthy();
      expect(activities[task].student).toBeTruthy();
      expect(activities[task].independent).toBeTruthy();
      expect(activities[task].fade).toBeTruthy();
    }
  });
  it("changes descriptors by domain and level",()=>{
    const early=getCanDoProfile("Writing",1,"Explain thinking","3–5","en");
    const later=getCanDoProfile("Writing",5,"Explain thinking","3–5","en");
    const listening=getCanDoProfile("Listening",1,"Explain thinking","3–5","en");
    expect(early.canDos[0]).not.toBe(later.canDos[0]);
    expect(early.canDos[0]).not.toBe(listening.canDos[0]);
  });
  it("changes the full guidance progression at every level",()=>{
    const profiles=[1,2,3,4,5,6].map(level=>getCanDoProfile("Reading",level,"Write a paragraph","3–5","en"));
    expect(new Set(profiles.map(x=>x.canDos.join("|"))).size).toBe(6);
    expect(new Set(profiles.map(x=>x.supports.join("|"))).size).toBe(6);
    expect(new Set(profiles.map(x=>x.teacherMoves.join("|"))).size).toBe(6);
    expect(new Set(profiles.map(x=>x.independence)).size).toBe(6);
    expect(new Set(profiles.map(x=>x.example)).size).toBe(6);
    expect(profiles[0].canDos.join(" ")).toContain("pointing, matching, drawing");
    expect(profiles[5].canDos.join(" ")).toContain("nuanced, specialized language");
  });
  it("returns localized Chinese guidance",()=>{
    const profile=getCanDoProfile("Speaking",2,"Discuss an idea","K–2","zh");
    expect(profile.canDos.join(" ")).toContain("完成任务");
    expect(profile.independence).toContain("独立");
  });
  it("keeps the cognitive task independent",()=>{
    const profile=getCanDoProfile("Reading",3,"Use evidence","3–5","en");
    expect(profile.independence).toContain("select relevant evidence");
    expect(profile.independence).toContain("not the reasoning");
  });
});
