package org.hms.medica.billservice.service;

import org.hms.medica.billservice.model.BillService;
import org.hms.medica.billservice.repo.BillServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillServiceService {

    private final BillServiceRepository billServiceRepository;

    @Autowired
    public BillServiceService(BillServiceRepository billServiceRepository) {
        this.billServiceRepository = billServiceRepository;
    }

    public BillService createBillService(BillService billService) {
        return billServiceRepository.save(billService);
    }

    public List<BillService> getAllBillServices() {
        return billServiceRepository.findAll();
    }

    public Optional<BillService> getBillServiceById(Long id) {
        return billServiceRepository.findById(id);
    }

    public BillService updateBillService(Long id, BillService updatedBillService) {
        if (billServiceRepository.existsById(id)) {
            updatedBillService.setId(id);
            return billServiceRepository.save(updatedBillService);
        } else {
            throw new IllegalArgumentException("BillService with id " + id + " not found");
        }
    }

    public void deleteBillService(Long id) {
        if (billServiceRepository.existsById(id)) {
            billServiceRepository.deleteById(id);
        } else {
            throw new IllegalArgumentException("BillService with id " + id + " not found");
        }
    }
}
