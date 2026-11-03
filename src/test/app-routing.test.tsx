import { existsSync } from "node:fs";
import { join } from "node:path";
import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { projects } from "@/lib/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("lists all 18 indexed projects with existing gallery images", () => {
    expect(projects.map(({ name }) => name)).toEqual([
      "The Waves Mall",
      "Qairouan Project North Industrial",
      "Medical Village Project",
      "Medical Village Project Admin 3",
      "Al Ajlan Rivera 48",
      "Hadab Tower Project",
      "Commercial Building",
      "Talal Residence Kinan Project",
      "Special School",
      "Hotel Project",
      "Private Villa Projects",
      "Khaled Bin Eid Al Arji Hospital Diabetic Foot Treatment",
      "Residential Project Al Tilal Al Majdiyah",
      "Kordoba School Project",
      "Al Dahayan Trading Project",
      "Balcona Tower",
      "Abha Project",
      "Philippine Embassy",
    ]);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(18);

    for (const project of projects) {
      expect(project.images.length, `${project.name} should have gallery images`).toBeGreaterThan(0);
      for (const image of project.images) {
        expect(existsSync(join(process.cwd(), "public", image.slice(1))), image).toBe(true);
      }
    }
  });
});
