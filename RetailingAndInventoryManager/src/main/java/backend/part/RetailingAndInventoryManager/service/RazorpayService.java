package backend.part.RetailingAndInventoryManager.service;

import backend.part.RetailingAndInventoryManager.io.RazorpayOrderResponse;
import com.razorpay.RazorpayException;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
