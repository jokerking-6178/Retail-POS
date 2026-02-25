package backend.part.RetailingAndInventoryManager.service;

import backend.part.RetailingAndInventoryManager.io.OrderRequest;
import backend.part.RetailingAndInventoryManager.io.OrderResponse;
import backend.part.RetailingAndInventoryManager.io.PaymentVerificationRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request);
    void deleteOrder(String orderId);
    List<OrderResponse> getLatestOrders();

    OrderResponse verifyPayment(PaymentVerificationRequest request);

    Double sumSalesBYDate(LocalDate date);
    Long countByOrderDate(LocalDate date);
    List<OrderResponse> findRecentOrders();
}
