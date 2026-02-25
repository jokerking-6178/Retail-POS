package backend.part.RetailingAndInventoryManager.service;

import backend.part.RetailingAndInventoryManager.io.ItemRequest;
import backend.part.RetailingAndInventoryManager.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

    ItemResponse add(ItemRequest request, MultipartFile file);
    List<ItemResponse> fetchItems();
    void deleteItem(String itemId);
}

