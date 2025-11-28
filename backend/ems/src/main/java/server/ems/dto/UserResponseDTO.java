package server.ems.dto;

import lombok.Data;

@Data
public class UserResponseDTO {
    private String id;
    private String email;
    private String role;
    private String name;
}
