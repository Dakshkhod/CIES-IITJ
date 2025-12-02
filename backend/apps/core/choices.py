"""
Choices for the core app.
Re-exports choices from events app for backward compatibility.
"""

from apps.events.choices import ActivityCategory, ActivityStatus, EventsCategory

__all__ = ['ActivityCategory', 'ActivityStatus', 'EventsCategory']
