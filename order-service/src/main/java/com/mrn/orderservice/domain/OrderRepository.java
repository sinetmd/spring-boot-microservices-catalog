package com.mrn.orderservice.domain;

import com.mrn.orderservice.domain.models.OrderStatus;
import com.mrn.orderservice.domain.models.OrderSummary;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

interface OrderRepository extends JpaRepository<OrderEntity, Long> {
    List<OrderEntity> findByStatus(OrderStatus status);

    Optional<OrderEntity> findByOrderNumber(String orderNumber);

    default void updateOrderStatus(String orderNumber, OrderStatus status) {
        OrderEntity order = this.findByOrderNumber(orderNumber).orElseThrow();
        order.setStatus(status);
        this.save(order);
    }

    @Query(
            """
                    select new com.mrn.orderservice.domain.models.OrderSummary(o.orderNumber, o.status)
                    from OrderEntity o
                    where o.username = :username
            """)
    List<OrderSummary> findByUsername(String username);

    @Query(
            """
                    select distinct o
                    from OrderEntity o left join o.items
                    where o.username = :username and o.orderNumber = :orderNumber
                    """)
    Optional<OrderEntity> findByUsernameAndOrderNumber(String username, String orderNumber);
}
