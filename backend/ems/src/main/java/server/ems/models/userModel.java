package server.ems.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class userModel {
    @Id
    private String id;
    private String email;
    private String password;
    private String role;
    private String name;
}