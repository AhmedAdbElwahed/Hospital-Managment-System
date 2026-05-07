package org.hms.medica.search.controller;

import lombok.RequiredArgsConstructor;
import org.hms.medica.search.model.DoctorIndex;
import org.hms.medica.search.model.PatientIndex;
import org.hms.medica.search.service.SearchService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/hms/v1/search")
@RequiredArgsConstructor
@ConditionalOnProperty(name = "elasticsearch.enabled", havingValue = "true")
public class SearchController {

    private final SearchService searchService;

    @GetMapping("/patients")
    public ResponseEntity<List<PatientIndex>> searchPatients(@RequestParam String query) {
        return ResponseEntity.ok(searchService.searchPatients(query));
    }

    @GetMapping("/doctors")
    public ResponseEntity<List<DoctorIndex>> searchDoctors(@RequestParam String query) {
        return ResponseEntity.ok(searchService.searchDoctors(query));
    }

    @PostMapping("/sync")
    public ResponseEntity<String> syncAll() {
        searchService.syncAll();
        return ResponseEntity.ok("Synchronization triggered successfully.");
    }
}
