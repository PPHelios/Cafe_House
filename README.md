# About My Home
* My Home is a real estate search website similar to (property finder), but it adds maps for more interactivity.
* It is a full stack app with authentication, role management ,db security in mind.
* Ads are searchable by location tags and filtered by variety of categories (price, area , rooms, ...)
* Ads are listed with pins on map which can be clicked to open a modal, and property cards clicking onw will open popup on the relative pin.
* The modal and cards have carousel, and action buttons (call, whatsapp)
* Users can have and manage favorites.
* Agencies and agents can be added throw list with us button for ease of testing.
* A full control panel is implemented to manage Agencies, Agents, Ads.
* Forms are validated using mantine forms.

## Technology
* Preact as the framework.
* Mantine for components and styling.
* Parse as backend server.
* Preact signals for state managment.
* Mantine Forms, carousel, Notifications.
* Maptiler for maps.
* Vite as bundler.

## Roles
* Admin and subadmin to manage agencies.
* Agency which can create "Admin, Moderator" to create ads and agents.
* Admin can create and manage all ads in the agency also can create "Moderator , SeniorAgent, Agent".
* Moderator can create agents and this role and its created agents have access only to its own ads.
* Senior agent have access to all prperties in the agency but can't create ads.
* Agent have access to ads created by his moderator.

## To be added
* Arabic Localization (i18 next is already added and configured).
* Client side Protected routes, db is already protected.
* 

