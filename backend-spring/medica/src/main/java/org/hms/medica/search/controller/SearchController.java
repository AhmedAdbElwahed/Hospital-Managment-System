package org.hms.medica.search.controller;

import lombok.RequiredArgsConstructor;
import org.hms.medica.search.model.DoctorIndex;
import org.hms.medica.search.model.PatientIndex;
import org.hms.medica.search.service.SearchService;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<PatientIndex>> searchPatients(@RequestParam String query, Pageable pageable) {
        return ResponseEntity.ok(searchService.searchPatients(query, pageable));
    }

    @GetMapping("/doctors")
    public ResponseEntity<Page<DoctorIndex>> searchDoctors(@RequestParam String query, Pageable pageable) {
        return ResponseEntity.ok(searchService.searchDoctors(query, pageable));
    }

    @PostMapping("/sync")
    public ResponseEntity<String> syncAll() {
        searchService.syncAll();
        return ResponseEntity.ok("Synchronization triggered successfully.");
    }
}
