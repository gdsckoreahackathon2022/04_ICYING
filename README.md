# github readme

### 2022 GDSC KR Winter Hack: **아이싱(ICYING)**
![logo1](https://user-images.githubusercontent.com/67955977/152625721-221fc963-e464-4508-a83b-fc4d5c8b4df5.png)
Copyright © ICYING. All rights reserved   
   
    
아이스팩 리사이클링의 완벽한 마무리, **아이싱(ICYING)**!🧊 

아이싱(ICYING) :: **기후 변화 대응 솔루션 아이스팩 리사이클링 플랫폼**

개발 기간 : 2022.02.04 ~ 2022.02.05

---

### 🧊 Deploy URLs

[https://icying.du.r.appspot.com/](https://icying.du.r.appspot.com/)
<br /><br />

🧊 **GOAL**

- UN에서 지정한 17가지 지속가능 개발 목표(SDGs) 중 **기후 변화 대응**(Climate Action)을 실현한다.
- 누군가는 사고, 누군가는 버리는 아이스팩을 **리사이클링을 통해 지속 가능 자원 순환 경제를 실현**하고자 한다.
<br /><br />

🧊 **PROBLEM**

- **환경적 문제 상황**
![problem](https://user-images.githubusercontent.com/67955977/152625787-82cb283e-74fd-4350-9e50-d079f12b178a.png)

    
    코로나19 펜데믹으로 비대면 거래가 증가하며 식료품 거래시 동봉되는 아이스팩 사용량 급증, 2020년에만 국내 아이스팩 생산량이 2.6억개에 달했다. 문제는 아이스팩 대부분이 미세플라스틱의 일종인 고흡수성폴리머로 구성되어 이를 소각하는 과정에서는 이산화탄소가 대량 발생하는 문제가, 매립시에는 토양 오염이 발생한다.
    
- **기존의 지자체 솔루션**
    
    ![기존시스템2](https://user-images.githubusercontent.com/67955977/152625799-e68081d2-9dc5-4475-9e17-a41e9360b8c6.png)

   아이스팩을 지자체 복지센터로 직접 반납 → 지자체의 센터에서 선별, 세척, 소독 → 지자체쪽에서 아이스팩의 수요가있는 업체를 직접 찾아 배부. **과정이 복잡하고 많은 인력이 필요해 사실상 방치되어 있는 상태**이다.
    
   - (또한 일부 기업에서 아이스팩을 수거하고 포인트를 지급하는 방식이 있지만, 해당 업체에서 재주문을 할 때만 수거를 해가서 이용률이 매우 떨어진다.)
<br />

🧊 **SOLUTION**

![아이싱시스템3](https://user-images.githubusercontent.com/67955977/152625821-c6e05fbf-b273-4258-9910-612dcc202fb7.png)


**예상 이용자** : 포장 및 배달에 아이스팩을 사용하는 가게 업주, 배달음식이나 식품 배송을 이용하는 모든 가구

- 아이스팩을 필요로 하는 업체에서는 ICYING에 업체 등록을 해둔다.
- 기부자는 복잡한 절차없이 ICYING에서 자신의 현재 위치와 가까운 가게를 확인하고, 아이스팩을 직접 업체에 반납한다.
- 업체에서 기부자 id를 입력하여 리워드를 적립한다.

⇒ 업체는 아이스팩을 계속 사지 않아도 되고, 기부자는 집에 남아도는 아이스팩으로 나만의 환경 리워드를 쌓아나갈 수 있다.
<br /><br />

🧊 **Tools (기술 구성 요소 기능 소개)** 
![tools](https://user-images.githubusercontent.com/67955977/152625831-14ac803f-5075-4044-8743-e106b7d6a0af.png)


- **Google Cloud Platform :**
    - **Compute Engine**
        - 서버를 직접 구매할 때 고려해야 할 전력, 위치, 서버 세팅, 확장성을 고민하지 않고 서비스 운영에만 집중할 수 있다.
        - 서비스 부하에 따라 실시간 확장성을 지원 받을 수 있으며, 사용한 만큼 비용을 지불하기 때문에 서비스 운영에 있어서 효율성이 훨씬 높아진다
        - 리사이클링에 대한 니즈와 아이싱에 대한 니즈가 세계적으로 높아지면 전세계에 데이터센터를 보유하고 있는 구글 클라우드를 통해 높은 가용성과 빠른 속도로 서버 구축 가능
    - **Google App Engine**
        - 서버리스로 빠르게 웹 배포
    - **Cloud Storage**
        - 사진, 동영상과 같은 정적 파일을 저장하는 버킷, 미디어 요소들을 효율적으로 관리할 수 있음
        
        ```python
        # settings.py
        DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
        STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
        GS_BUCKET_NAME = os.getenv("GOOGLE_BUCKET_NAME")
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = BASE_DIR + '/service_account.json'
        ```
        
    - **Google Maps Platform**
        - 매장의 위도, 경도를 구하기 위해 API 사용
        - 간단하게 API 호출로 위도, 경도 값을 구할 수 있었으며 전세계의 방대한 지도 데이터를 가지고 있는 구글 지도로 해외 확장 용이할 것으로 기대함
            
            ```python
            url = f"https://maps.googleapis.com/maps/api/place/findplacefromtext/json" \
                      f"?input={address}" \
                      f"&inputtype=textquery" \
                      f"&fields=geometry" \
                    f"&key={os.getenv('GOOGLE_MAPS_API_KEY')}"
            
            payload = {}
            headers = {}
            
            response = requests.request("GET", url, headers=headers, data=payload).json()
            geometry = response.get('candidates')[0].get('geometry').get('location')
            
            return geometry.get('lat'), geometry.get('lng')
            ```
            
- GPS : 사용자 현위치를 파악해서 사용자 지역 기반 컨텐츠를 제공 및 이용 가능하게 한다.
- Google Map Patform -geocoding API : api로 손쉽게 개발 가능해서 채택하게 됨. Google의 전세계 기반이므로 해외로 확장하게 된다면 쉽게 적용 가능하여 채택하게 됨
- REACT
- Django Rest Framework
<br /><br />

🧊 **아키텍처**

![architecture](https://user-images.githubusercontent.com/67955977/152625840-38fa676f-a968-4f57-91a4-51c4a55bf224.png)
<br /><br />

🧊 **UI/UX**
![image](https://user-images.githubusercontent.com/76686872/152626137-2891761b-6339-41fb-8bda-13c92e65db6e.png)
![image](https://user-images.githubusercontent.com/76686872/152626151-180fe7ec-3f31-4c92-aa9d-747f8a6d4207.png)
![image](https://user-images.githubusercontent.com/76686872/152626154-deab64ae-329a-447b-b58e-880d367495cc.png)
![image](https://user-images.githubusercontent.com/76686872/152626155-c0367f39-3f1a-4fc8-bbca-df22dabb63e0.png)
![image](https://user-images.githubusercontent.com/76686872/152626158-5130a700-52b7-4a2e-8f89-56e0abca0158.png)
<br /><br />


🧊 **ERD**

![erd](https://user-images.githubusercontent.com/67955977/152625849-bcc840cf-a665-45a4-9d8e-f05bae40bb5b.jpg)
<br /><br />

### 🧊 API Docs

[https://documenter.getpostman.com/view/11419696/UVeFN7CL#927ca5e1-9451-4eff-be63-2bb68d60b3bd](https://documenter.getpostman.com/view/11419696/UVeFN7CL#927ca5e1-9451-4eff-be63-2bb68d60b3bd)
<br /><br />

 **🧊 성장 가능 전략**

1. 단순하게 아이스팩을 주고 받는 교환 목적성 플랫폼이 아닌, 지역 주민들이 리사이클링 목적으로 생산한 **‘컨텐츠를 소비할 수 있는 플랫폼’으로서의 역할**을 하게 한다.
2. 지역 주민들이 유용하게 이용할 수 있는 서비스를 연계해주는 온디맨드(On-Demand) O2O(Offline to Online) 서비스 플랫폼으로 지역 커뮤니티를 형성한다.
<br />

🧊 **차별성 및 독창성**

- **저렴한 비용으로 시스템 구축 가능** : 기존에 지자체에서 진행하고 있는 시스템은 수거, 선별, 배부 등의 관리하는 과정에서 많은 시간과 인력이 사용되고, 제대로 관리도 되지 못하고 있다. 아이싱은 기부자 - 업주가 1:1로 중간 단계없이 빠르게 순환 가능한 시스템이다.
- **참여에 제한없는 시스템** : 기존의 기업 리사이클링 시스템은 해당 기업의 아이스팩을 반납하고, 재구매를 해야 참여 가능한 것과 달리 해당 가게에서 물건을 구매하지 않았어도 누구나 자유롭게 리사이클링에 참여 가능하다.
- **나만의 리워드** : 업체 구분 없이 모든 업체로부터 나의 리사이클링 적립 리워드를 쌓을 수 있다. (정말 귀여운 메달은 덤!)
- **다양한 방면으로의 확장 가능성** : 본 프로젝트가 아이스팩으로 시작하였지만, 리사이클 가능한 모든 제품으로 확장 가능하다.
<br />

🧊 **활용 방안 및 확대 방향**

1. 아이스팩 리사이클링으로 시작하였지만, 단순한 아이스팩 반납 서비스가 아닌 리사이클링 가능한 모든 제품을 주고 받을 수 있는 **‘지역기반 리사이클링 플랫폼’으로 확장**한다.
2. 리사이클링 목적으로 리스트에 오르며 지역 소상공인들이 **지역 업체 광고 효과**를 얻을 수 있는 플랫폼으로의 역할까지 할 수 있다.
3. 시간 관계상 구현하지 못하였지만 식당별로 기부한 아이스팩 개수만큼 스탬프 찍어주는 리워드도 확장할 계획이다.
4. 머신러닝을 적용해 AI가 사람 대신 스팸 포스팅이나 리사이클링이 불가능하거나 기부자들에게 서비스할 수 없는 품목들을 판별 기능을 추가한다.
5. 현재 웹으로 개발하였으나, 추후 어플리케이션으로 이용 가능하게 안드로이드, iOS에 배포 예정이다. 또한 아이디를 입력하는 방식에서 QR코드를 이용할 수 있게 기능을 추가하는 방향으로 확대한다.
6. 제로웨이스트 운동 중 요즘 유행하는 ‘용기내 캠페인’도 서비스 확장하여 ‘용기내’로 주문할 때도 리워드가 적립되는 시스템으로 확장할 수 있다.
<br />

🧊 **TEAM**

Coconut 장성은 김민지 권은지 김서현
- 장성은 : BE Engineer
- 김민지 : 팀장 / 기획 / 디자이너
- 권은지 : Web FE Engineer
- 김서현 : Web FE Engineer
