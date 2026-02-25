package backend.part.RetailingAndInventoryManager.service;

import backend.part.RetailingAndInventoryManager.io.CategoryRequest;
import backend.part.RetailingAndInventoryManager.io.CategoryResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request, MultipartFile file);
    List<CategoryResponse> read();
    void delete(String categoryId);
}
