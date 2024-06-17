package org.hms.medica.billservice.controller;

import org.hms.medica.billservice.model.BillService;
import org.hms.medica.billservice.service.BillServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/hms/v1/bill-services")
public class BillServiceController {

    private final BillServiceService billServiceService;

    @Autowired
    public BillServiceController(BillServiceService billServiceService) {
        this.billServiceService = billServiceService;
    }

    @PostMapping("/create")
    public ResponseEntity<BillService> createBillService(@RequestBody BillService billService) {
        BillService createdBillService = billServiceService.createBillService(billService);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBillService);
    }

    @GetMapping
    public ResponseEntity<List<BillService>> getAllBillServices() {
        List<BillService> billServices = billServiceService.getAllBillServices();
        return ResponseEntity.ok(billServices);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BillService> getBillServiceById(@PathVariable Long id) {
        Optional<BillService> billService = billServiceService.getBillServiceById(id);
        return billService.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<BillService> updateBillService(@PathVariable Long id,
            @RequestBody BillService updatedBillService) {
        BillService billService = billServiceService.updateBillService(id, updatedBillService);
        return ResponseEntity.ok(billService);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBillService(@PathVariable Long id) {
        billServiceService.deleteBillService(id);
        return ResponseEntity.noContent().build();
    }
}
