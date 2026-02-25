package backend.part.RetailingAndInventoryManager.controller;

import backend.part.RetailingAndInventoryManager.io.OrderResponse;
import backend.part.RetailingAndInventoryManager.io.PaymentRequest;
import backend.part.RetailingAndInventoryManager.io.PaymentVerificationRequest;
import backend.part.RetailingAndInventoryManager.io.RazorpayOrderResponse;
import backend.part.RetailingAndInventoryManager.service.OrderService;
import backend.part.RetailingAndInventoryManager.service.RazorpayService;
import com.razorpay.RazorpayException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }

    @PostMapping("/verify")
    @ResponseStatus(HttpStatus.OK)
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
