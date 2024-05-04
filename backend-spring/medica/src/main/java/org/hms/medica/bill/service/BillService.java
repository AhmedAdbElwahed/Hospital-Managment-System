package org.hms.medica.bill.service;

import org.hms.medica.bill.model.Bill;
import org.hms.medica.bill.repo.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BillService {

    private final BillRepository billRepository;

    @Autowired
    public BillService(BillRepository billRepository) {
        this.billRepository = billRepository;
    }

    public Bill createBill(Bill bill) {
        return billRepository.save(bill);
    }

    public List<Bill> getAllBills() {
        return billRepository.findAll();
    }

    public Optional<Bill> getBillById(Long id) {
        return billRepository.findById(id);
    }

    public Bill updateBill(Long id, Bill updatedBill) {
        Optional<Bill> billOptional = billRepository.findById(id);
        if (billOptional.isPresent()) {
            Bill existingBill = billOptional.get();
            existingBill.setStatus(updatedBill.getStatus());
            existingBill.setAmount(updatedBill.getAmount());
            existingBill.setBill_date(updatedBill.getBill_date());
            existingBill.setPatient(updatedBill.getPatient());
            return billRepository.save(existingBill);
        } else {
            throw new RuntimeException("Bill not found with id: " + id);
        }
    }

    public void deleteBill(Long id) {
        billRepository.deleteById(id);
    }
}
