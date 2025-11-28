package server.ems.dto;

import lombok.Data;

@Data
public class LeaveRequestDTO {
    private String id;
    private String employeeMail;
    private String startDate;
    private String endDate;
    private String reason;
    private String status;
    private String type; // "single" for one day, "range" for multiple dates
}
