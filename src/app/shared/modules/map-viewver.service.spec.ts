import { TestBed } from "@angular/core/testing";

import { MapViewverService } from "./map-viewver/map-viewver.service";

describe("MapViewverService", () => {
  let service: MapViewverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapViewverService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
