package com.mobigen.afnas;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping(value = "/")
public class ViewController {
    @RequestMapping(value = {"/msf"}, method = RequestMethod.GET)
    public String viewSampeIndex() {
        return "/msf/index";
    }

    @RequestMapping(value = {"/msf/main"}, method = RequestMethod.GET)
    public String viewSampeMain() {
        return "/msf/main";
    }

    @RequestMapping(value = {"/msf/sample-mdi.html"}, method = RequestMethod.GET)
    public String viewSampleMdi() {
        return "/msf/sample/sample-mdi";
    }

    @RequestMapping(value = {"/msf/sample-dashboard.html"}, method = RequestMethod.GET)
    public String viewSampleDashboard() {
        return "/msf/sample/sample-dashboard";
    }

    @RequestMapping(value = {"/msf/sample-websocket.html"}, method = RequestMethod.GET)
    public String viewSampleWebSocket() {
        return "/msf/sample/sample-websocket";
    }

    @RequestMapping(value = {"/"}, method = RequestMethod.GET)
    public String viewIndex() {
        return "/afnas/index";
    }

    @RequestMapping(value = {"/index/user_add_popup_template.html"}, method = RequestMethod.GET)
    public String viewAddUserPopup() {
        return "/afnas/common/popup/user_add_popup_template";
    }

    @RequestMapping(value = {"/main"}, method = RequestMethod.GET)
    public String viewMain() {
        return "/afnas/main";
    }

    @RequestMapping(value = {"/dashboard"}, method = RequestMethod.GET)
    public String viewDashboard() { return "/afnas/dashboard/dashboard"; }

    @RequestMapping(value = {"/dashboard/dashboard_detail_popup.html"}, method = RequestMethod.GET)
    public String viewDashboardDetail() {
        return "afnas/dashboard/popup/dashboard_detail_popup";
    }

    @RequestMapping(value = {"/system"}, method = RequestMethod.GET)
    public String viewSystem() { return "/afnas/system/system"; }

    @RequestMapping(value = {"/alarm"}, method = RequestMethod.GET)
    public String viewAlarm() { return "/afnas/alarm/alarm"; }

    @RequestMapping(value = {"/monitoring"}, method = RequestMethod.GET)
    public String viewMonitoring() { return "/afnas/monitoring/monitoring"; }

    @RequestMapping(value = {"/analytics"}, method = RequestMethod.GET)
    public String viewAnalytics() { return "/afnas/analytics/analytics"; }
    
    @RequestMapping(value = {"/common/popup/user_update_popup_template.html"}, method = RequestMethod.GET)
    public String viewUpdateUserPopup() {
        return "/afnas/common/popup/user_update_popup_template";
    }
    
    @RequestMapping(value = {"/common/popup/user_password_popup_template.html"}, method = RequestMethod.GET)
    public String viewPasswordConfirmPopup() {
        return "/afnas/common/popup/user_password_popup_template";
    }

}
