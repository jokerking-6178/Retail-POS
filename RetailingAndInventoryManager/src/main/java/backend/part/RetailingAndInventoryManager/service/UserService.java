package backend.part.RetailingAndInventoryManager.service;

import backend.part.RetailingAndInventoryManager.io.UserRequest;
import backend.part.RetailingAndInventoryManager.io.UserResponse;

import java.util.List;

public interface UserService {


    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUsers();
    void deleteUser(String id);
}
