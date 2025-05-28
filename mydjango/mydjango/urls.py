"""
URL configuration for mydjango project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from lab3.views import team_detail, team_form, team_list, team_delete, spa_view, react_view
from myapp1.Rest.BaseCrudSet import AvgAgePerTeamAPIView, PlayerCountPerTeamAPIView, TopTeamsByGoalsAPIView, \
    HighScoreDifferenceMatchesAPIView, PlayersAbove30APIView, MatchCountByMonthAPIView
from myapp1.Rest.CrudViews import MatchCrudView, TeamCrudView, PlayerCrudView
from myapp1.threads import  dash_thr
from myapp1.views import dashboard_view, dash1, dash2, dash3, dashboard_home, filter_data, dash4, dash5, bokeh1, bokeh2, \
    bokeh3, bokeh4, bokeh5, bokeh6

urlpatterns = [
    path('api/auth/', include('authentication.urls')),
    path('admin/', admin.site.urls),

    path('api/teams/', TeamCrudView.as_view(), name='team-list-create'),
    path('api/teams/<int:pk>/', TeamCrudView.as_view(), name='team-detail'),
    path('api/players/', PlayerCrudView.as_view(), name='player-list-create'),
    path('api/players/<int:pk>/', PlayerCrudView.as_view(), name='player-detail'),
    path('api/matches/', MatchCrudView.as_view(), name='match-list-create'),
    path('api/matches/<int:pk>/', MatchCrudView.as_view(), name='match-detail'),
    path('api/team/', team_list, name='team-list'),
    path('create/', team_form, name='team-create'),
    path('team/<int:pk>/edit/', team_form, name='team-edit'),
    path('team/<int:pk>/', team_detail, name='team-detail'),
    path('team/<int:pk>/delete/', team_delete, name='team-delete'),
    path('', react_view, name='react'),
    path('spa/', spa_view, name='spa')
]
