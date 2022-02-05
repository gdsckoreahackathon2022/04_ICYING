from django.urls import path, include


v1_patterns = [
    path('auth/', include(('auth.urls', 'auth'))),
    path('', include('core.urls')),
    path('rewards/', include('rewards.urls')),
    # path('users/', include(('accounts.urls', 'accounts'))),
]


urlpatterns = [
    path('v1/', include((v1_patterns, 'v1'))),
]
