package server.ems.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Document(collection = "leave_requests")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class leaveModel {
    @Id
    private String id;
    private String employeeId;
    private String employeeMail;
    private String startDate;
    private String endDate;
    private String reason;
    private String status;

}
