package backend.part.RetailingAndInventoryManager.repository;

import backend.part.RetailingAndInventoryManager.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {

}
