package com.mycompany.myapp.cucumber.stepdefs;

import com.mycompany.myapp.GatewayuaaApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = GatewayuaaApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
