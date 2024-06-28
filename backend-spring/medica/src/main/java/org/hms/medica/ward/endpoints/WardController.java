package org.hms.medica.ward.endpoints;


import lombok.RequiredArgsConstructor;
import org.hms.medica.ward.dto.WardRequestDto;
import org.hms.medica.ward.dto.WardResponseDto;
import org.hms.medica.ward.service.WardService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("hms/v1/ward")
@RequiredArgsConstructor
public class WardController {

    private final WardService wardService;

    @GetMapping
    public ResponseEntity<List<WardResponseDto>> fetchAllWards() {
        return ResponseEntity.status(HttpStatus.OK).body(wardService.getAllWards());
    }


    @GetMapping("/get-by-id/{id}")
    public ResponseEntity<WardResponseDto> fetchWardById(@PathVariable(name = "id") Long WardId) {
        return ResponseEntity.status(HttpStatus.OK).body(wardService.getWardDto(WardId));
    }

    @PostMapping("/add-ward")
    public ResponseEntity<String> addWard(@RequestBody WardRequestDto WardDto) {
        wardService.addWard(WardDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Ward added successfully");
    }

    @PutMapping("/update-ward/{id}")
    public ResponseEntity<String> updateWard(
            @PathVariable(name = "id") Long wardId,
            @RequestBody WardRequestDto WardDto) {
        wardService.updateWard(wardId, WardDto);
        return ResponseEntity.status(HttpStatus.OK).body("Ward updated successfully");
    }

    @DeleteMapping("/delete-by-id/{id}")
    public ResponseEntity<String> deleteWardById(@PathVariable(name = "id") Long WardId) {
        wardService.deleteWardById(WardId);
        return ResponseEntity.status(HttpStatus.OK).body("Ward d    eleted successfully");
    }

}
