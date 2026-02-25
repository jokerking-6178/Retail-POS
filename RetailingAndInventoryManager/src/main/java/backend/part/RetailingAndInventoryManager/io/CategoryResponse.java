package backend.part.RetailingAndInventoryManager.io;

import lombok.Builder;
import lombok.Data;

import java.sql.Timestamp;

@Data
@Builder
public class CategoryResponse {

    private String name;
    private String description;
    private String bgColor;
    private String categoryId;
    private Timestamp createdAt;
    private Timestamp updatedAt;
    private String imgUrl;
    private Integer items;

}
