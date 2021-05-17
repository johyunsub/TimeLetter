package com.caterpie.timeletter.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.caterpie.timeletter.entity.Alarm;
import com.caterpie.timeletter.repository.AlarmRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmScheduler {
	private static final Logger logger = LoggerFactory.getLogger(AlarmScheduler.class);

	@Autowired
	private AlarmRepository alarmRepository;

	@Scheduled(cron = "0 1 0 * * *")	//매일 00시01분 실행
//	@Scheduled(cron = "0/10 * * * * *")	//10초에 한번씩 실행
//	@Scheduled(cron = "0 0/10 * * * *")	//1분에 한번씩 실행
    public void cronJob() {
    	logger.info("scheduled");
    	
    	//알람테이블에 넣을 비오픈레터이면서 오늘 오픈될레터들 조회
    	List<Map<Alarm, Object>> alarms = alarmRepository.findClosedLetters();	
    	
    	//알람테이블에 하나씩 셋팅
    	for(int i=0, l=alarms.size(); i<l; i++) {		
    		int userId = (int) alarms.get(i).get("user_id");
    		int letterId = (int) alarms.get(i).get("letter_id");
    		alarmRepository.insertAlarm(userId, letterId);	
    		alarmRepository.updateLetter(letterId);	//비공개->공개 처리
    	}
    	
    	
    	//문자 보내기(letter_code)
    	
    	
    	
	}
}
