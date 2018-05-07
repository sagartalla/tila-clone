import _ from 'lodash';
import { listingServiceInstance } from '../helper/services';

const mydata = [{ "product_details": { "catalog_details": { "catalog_id": "CMOBUHBJAD13WDDQZ3", "item_type_name": "mobile", "attribute_map": { "processor_brand": { "name": "processor_brand", "display_string": "processor_brand", "attribute_category_name": "General", "visible": false, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Apple" }] }, "supported_languages": { "name": "supported_languages", "display_string": "supported_languages", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Multi-language Support" }] }, "headset_present": { "name": "headset_present", "display_string": "headset_present", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "full_hd_recording": { "name": "full_hd_recording", "display_string": "full_hd_recording", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "operating_system_version_name": { "name": "operating_system_version_name", "display_string": "operating_system_version_name", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "NA" }] }, "resolution": { "name": "resolution", "display_string": "resolution", "attribute_category_name": "Display Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "2436 x 1125" }] }, "primary_camera_features": { "name": "primary_camera_features", "display_string": "primary_camera_features", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Wide-angle and Telephoto Cameras, Wide-angle: f/1.8 Aperture, Telephoto: f/2.4 Aperture, Portrait Mode, Portrait Lighting (Beta), Dual Optical Image Stabilization, Six-element Lens, Panorama (Upto 63MP), Sapphire Crystal Lens Cover, Backside Illumination Sensor, Hybrid IR Filter, Autofocus with Focus Pixels, Tap to Focus with Focus Pixels, Live Photos with Stabilization, Wide Color Capture for Photos and Live Photos, Improved local Tone Mapping, Body and Face Detection, Exposure Control, Noise Reduction, Auto HDR for Photos, Auto Image Stabilization, Burst Mode, Timer Mode, Photo Geotagging, Image Formats Captured: HEIF and JPEG" }] }, "resolution_type": { "name": "resolution_type", "display_string": "resolution_type", "attribute_category_name": "Display Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Super Retina HD Display" }] }, "secondary_camera_features": { "name": "secondary_camera_features", "display_string": "secondary_camera_features", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Portrait Mode, Portrait Lighting (Beta), Animoji, 1080p HD Video Recording, f/2.2 Aperture, Wide Color Capture for Photos and Live Photos, Auto HDR, Backside Illumination Sensor, Body and Face Detection, Auto Image Stabilization, Burst Mode, Exposure Control, Timer Mode" }] }, "model_name": { "name": "model_name", "display_string": "model_name", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "iPhone X" }] }, "hd_recording": { "name": "hd_recording", "display_string": "hd_recording", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "wifi_version": { "name": "wifi_version", "display_string": "wifi_version", "attribute_category_name": "Connectivity Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "802.11 ac (Wi-Fi with MIMO)" }] }, "battery_type": { "name": "battery_type", "display_string": "battery_type", "attribute_category_name": "Power Features", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Lithium-Ion" }] }, "display_size": { "name": "display_size", "display_string": "display_size", "attribute_category_name": "Display Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "5.8" }] }, "important_apps": { "name": "important_apps", "display_string": "important_apps", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Camera, Photos, Health, Messages, Phone, FaceTime, Mail, Music, Wallet, Siri, Calendar, iTunes Store, App Store, Notes, News, Contacts, iBooks, Home, Weather, Reminders, Clock, TV, Stocks, Calculator, Voice Memos, Compass, Podcasts, Watch, Tips, Find My iPhone, Find My Friends, Settings, Files" }] }, "brand": { "name": "brand", "display_string": "brand", "attribute_category_name": "General", "visible": false, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Apple" }] }, "height": { "name": "height", "display_string": "height", "attribute_category_name": "Dimensions", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "143.6" }] }, "wifi": { "name": "wifi", "display_string": "wifi", "attribute_category_name": "Connectivity Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "sim_type": { "name": "sim_type", "display_string": "sim_type", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Single SIM" }] }, "no_of_cores": { "name": "no_of_cores", "display_string": "no_of_cores", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "NA" }] }, "weight": { "name": "weight", "display_string": "weight", "attribute_category_name": "Dimensions", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "174" }] }, "additional_features": { "name": "additional_features", "display_string": "additional_features", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Video Recording: 4K Video Recording at 24 fps, 30 fps, or 60 fps, 1080P HD Video Recording at 30 fps or 60 fps, 720P HD Video Recording at 30 fps, Optical Image Stabilization for Video, Optical Zoom: 6x Digital Zoom, Quad LED True Tone Flash, Slo-Mo Video Support for 1080P at 120 fps or 240 fps, Time-lapse Video with Stabilization, Cinematic Video Stabilization (1080P and 720P), Continuous Autofocus Video, Body and Face Detection, Noise Reduction, Take 8MP Still Photos while Recording 4K Video, Playback Zoom, Video Geotagging, Video Formats Recorded: HEVC and H.264, Face ID: Enabled by TrueDepth Camera for Facial Recognition, Apple Pay, NFC with Reader Mode, Location: Digital Compass, Wi-Fi, Cellular, iBeacon Microlocation, Accessibility: VoiceOver, Zoom, Magnifier, Software TTY, Siri and Dictation, Type to Siri, Switch Control, Closed Captions, AssistiveTouch, Speak Screen, Rating for Hearing Aids: iPhone X (Model A1865, A1901): M3, T4, System Requirements - Apple ID (Required for Some Features)" }] }, "gps_type": { "name": "gps_type", "display_string": "gps_type", "attribute_category_name": "Navigation Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Assisted GPS, GLONASS, Galileo, QZSS" }] }, "supported_network": { "name": "supported_network", "display_string": "supported_network", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "WCDMA" }] }, "memory_card_slot_type": { "name": "memory_card_slot_type", "display_string": "memory_card_slot_type", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "NA" }] }, "flash": { "name": "flash", "display_string": "flash", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Rear Quad LED True Tone Flash with Slow Sync and Front Retina Flash" }] }, "sales_package": { "name": "sales_package", "display_string": "sales_package", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Headset, Charger, EarPods" }] }, "bluetooth_support": { "name": "bluetooth_support", "display_string": "bluetooth_support", "attribute_category_name": "Connectivity Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "processor_type": { "name": "processor_type", "display_string": "processor_type", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor" }] }, "optical_zoom": { "name": "optical_zoom", "display_string": "optical_zoom", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "bluetooth_version": { "name": "bluetooth_version", "display_string": "bluetooth_version", "attribute_category_name": "Connectivity Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "5" }] }, "digital_zoom": { "name": "digital_zoom", "display_string": "digital_zoom", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Digital Zoom Upto 10x" }] }, "map_support": { "name": "map_support", "display_string": "map_support", "attribute_category_name": "Navigation Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Maps" }] }, "primary_camera_megapixel": { "name": "primary_camera_megapixel", "display_string": "primary_camera_megapixel", "attribute_category_name": "Camera Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "12" }] }, "video_recording_resolution": { "name": "video_recording_resolution", "display_string": "video_recording_resolution", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "3840 x 2160 Pixels" }] }, "audio_formats": { "name": "audio_formats", "display_string": "audio_formats", "attribute_category_name": "Multimedia Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "AAC-LC, HE-AAC, HE-AAC v2, Protected AAC, MP3, Linear PCM, Apple Lossless, FLAC, Dolby Digital (AC-3), Dolby Digital Plus (E-AC-3), Audible (Formats 2, 3, 4, Audible Enhanced Audio, AAX, and AAX+)" }] }, "sms": { "name": "sms", "display_string": "sms", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "operating_system": { "name": "operating_system", "display_string": "operating_system", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "iOS" }] }, "predictive_text_input": { "name": "predictive_text_input", "display_string": "predictive_text_input", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "graphics_ppi": { "name": "graphics_ppi", "display_string": "graphics_ppi", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "458" }] }, "clock_speed": { "name": "clock_speed", "display_string": "clock_speed", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999" }] }, "internet_connectivity": { "name": "internet_connectivity", "display_string": "internet_connectivity", "attribute_category_name": "Connectivity Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "4G, 3G, Wi-Fi" }] }, "primary_camera_dual_lens": { "name": "primary_camera_dual_lens", "display_string": "primary_camera_dual_lens", "attribute_category_name": "Camera Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "12" }] }, "gps_support": { "name": "gps_support", "display_string": "gps_support", "attribute_category_name": "Navigation Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "model_id": { "name": "model_id", "display_string": "model_id", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "MQA52HN/A" }] }, "type_browse": { "name": "type_browse", "display_string": "type_browse", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Smartphones" }] }, "touch_screen": { "name": "touch_screen", "display_string": "touch_screen", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Yes" }] }, "hybrid_sim_slot": { "name": "hybrid_sim_slot", "display_string": "hybrid_sim_slot", "attribute_category_name": "General", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "No" }] }, "sim_size": { "name": "sim_size", "display_string": "sim_size", "attribute_category_name": "Other Details", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Nano SIM" }] }, "other_business_features": { "name": "other_business_features", "display_string": "other_business_features", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Mail Attachment Support: Viewable Document Types - JPG, TIFF, GIF (Images), Doc and Docx (Microsoft Word), Htm and Html (Web Pages), Key (Keynote), Numbers (Numbers), Pages (Pages), Pdf (Preview and Adobe Acrobat), Ppt and Pptx (Microsoft Powerpoint), Txt (Text), Rtf (Rich Text Format), Vcf (Contact Information), Xls and Xlsx (Microsoft Excel), Zip, Ics" }] }, "depth": { "name": "depth", "display_string": "depth", "attribute_category_name": "Dimensions", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "7.7" }] }, "sensors": { "name": "sensors", "display_string": "sensors", "attribute_category_name": "Other Details", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Face ID, Barometer, Three-axis Gyro, Accelerometer, Proximity Sensor, Ambient Light Sensor" }] }, "video_formats": { "name": "video_formats", "display_string": "video_formats", "attribute_category_name": "Multimedia Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "HEVC, H.264, MPEG-4 Part 2, Motion JPEG, High Dynamic Range with Dolby Vision and HDR10 Content" }] }, "operating_system_version_number": { "name": "operating_system_version_number", "display_string": "operating_system_version_number", "attribute_category_name": "OS & Processor Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "11" }] }, "width": { "name": "width", "display_string": "width", "attribute_category_name": "Dimensions", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "70.9" }] }, "battery_capacity": { "name": "battery_capacity", "display_string": "battery_capacity", "attribute_category_name": "Power Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999" }] }, "secondary_camera_megapixel": { "name": "secondary_camera_megapixel", "display_string": "secondary_camera_megapixel", "attribute_category_name": "Camera Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "7" }] }, "other_display_features": { "name": "other_display_features", "display_string": "other_display_features", "attribute_category_name": "Display Features", "visible": true, "searchable": false, "filterable": false, "attribute_values": [{ "value": "HDR Display, 1,000,000:1 Contrast Ratio (Typical), True Tone Display, Wide Color Display (P3), 3D Touch, 625 cd/m2 Max Brightness (Typical), Fingerprint-resistant Oleophobic Coating, Support for Display of Multiple Languages and Characters Simultaneously" }] }, "network_type": { "name": "network_type", "display_string": "network_type", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "2G" }] } }, "blacklist_countries": null }, "product_details_vo": { "cached_product_details": { "catalog_id": "CMOBUHBJAD13WDDQZ3", "product_id": "PMOBH2OXUVSUSTKUCP", "item_type_name": "mobile", "media": { "gallery_media": [{ "type": "IMAGE", "url": "catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyysgmypxmazk.jpeg", "caption": " ", "order": "1", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzyf8dyfgaaq.jpeg", "caption": " ", "order": "2", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyzzw2zrxkwug.jpeg", "caption": " ", "order": "3", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBH2OXUVSUSTKUCP/GALLERY/MEDIAKMMKVZE0YH5JQ1FGHFGHY6/apple-iphone-x-mqa82hn-a-original-imaeyysge4tu4gva.jpeg", "caption": " ", "order": "4", "restricted": false }] }, "rich_product_desc": [], "attribute_map": { "ean": { "name": "ean", "display_string": "ean", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "190198456649" }] }, "color": { "identity": true, "name": "color", "display_string": "color", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Space Grey" }] }, "calculated_highlights": { "identity": false, "name": "calculated_highlights", "display_string": "Highlights", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "| 64.00 GB |" }, { "value": "12MP Rear Camera | 7MP Front Camera" }, { "value": "A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor" }] }, "": "", "internal_storage": { "identity": true, "name": "internal_storage", "display_string": "internal_storage", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "64.00" }] }, "calculated_display_name": { "name": "calculated_display_name", "display_string": "Display Title", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Apple iPhone X (Space Grey, 64.00 GB)" }] }, "color_for_refiner": { "name": "color_for_refiner", "display_string": "color_for_refiner", "attribute_category_name": "h_color_for_refiner", "visible": false, "searchable": true, "filterable": true, "attribute_values": [{ "value": "Grey" }] }, "ram": { "name": "ram", "display_string": "ram", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999.00" }] } } }, "cached_variant": { "VMOBTPHHFGMJTVMCYT": { "attribute_map": {} } } }, "variant_details": null, "product_id": "PMOBH2OXUVSUSTKUCP" }, "variant_preferred_listings": { "VMOBTPHHFGMJTVMCYT": [{ "listing_id": "5aed6ada5ccd97388e588407", "product_id": "PMOBH2OXUVSUSTKUCP", "variant_id": "VMOBTPHHFGMJTVMCYT", "seller_rating": "3", "selling_price": 100000, "total_inventory_count": 0, "selling_price_currency": "SAR", "seller_name": "Entity-1", "seller_id": null, "seller_type": null, "inventory_list": [{ "inventory_id": "INVdevgjg7lledw", "inventory_city": "string", "stock_count": 2340, "dispatch_days": 0, "dispatch_hours": 0 }], "max_limit_per_user": "4", "accepts_returns": "true", "max_days_to_return": "1", "shipping": { "listing_id": "5aed6ada5ccd97388e588407", "warehouse_id": null, "shipping_fees": 0, "shippable_countries": ["DUB"] }, "active": false }] }, "listing_info": null, "listing_id": null, "similar_products": [{ "product_details_vo": { "cached_product_details": { "catalog_id": "CMOBUHBJAD13WDDQZ3", "product_id": "PMOBTOU5XP2UZW2UHI", "item_type_name": "mobile", "media": { "gallery_media": [{ "type": "IMAGE", "url": "catalog/mobile/PMOBTOU5XP2UZW2UHI/GALLERY/MEDIA22VPTP09AUDFHHFJ5HNQZ1/apple-iphone-x-mqa92hn-a-original-imaeyysgqbg8qmhn.jpeg", "caption": " ", "order": "1", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBTOU5XP2UZW2UHI/GALLERY/MEDIA22VPTP09AUDFHHFJ5HNQZ1/apple-iphone-x-mqa92hn-a-original-imaeyzzvaqggkygg.jpeg", "caption": " ", "order": "2", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBTOU5XP2UZW2UHI/GALLERY/MEDIA22VPTP09AUDFHHFJ5HNQZ1/apple-iphone-x-mqa62hn-a-original-imaeyzzc2akw459y.jpeg", "caption": " ", "order": "3", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBTOU5XP2UZW2UHI/GALLERY/MEDIA22VPTP09AUDFHHFJ5HNQZ1/apple-iphone-x-mqa62hn-a-original-imaeyysgjbe3qzwz.jpeg", "caption": " ", "order": "4", "restricted": false }] }, "rich_product_desc": [], "attribute_map": { "color": { "identity": true, "name": "color", "display_string": "color", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Silver" }] }, "calculated_highlights": { "identity": false, "name": "calculated_highlights", "display_string": "Highlights", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "| 256.00 GB |" }, { "value": "12MP Rear Camera | 7MP Front Camera" }, { "value": "A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor" }] }, "": "", "internal_storage": { "identity": true, "name": "internal_storage", "display_string": "internal_storage", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "256.00" }] }, "calculated_display_name": { "name": "calculated_display_name", "display_string": "Display Title", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Apple iPhone X (Silver, 256.00 GB)" }] }, "ram": { "name": "ram", "display_string": "ram", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999.00" }] } } }, "cached_variant": { "VMOBIQMUGZL58TZUWC": { "attribute_map": {} } } }, "listing": { "listing_id": "5aed6d235ccd97388e58840b", "product_id": "PMOBTOU5XP2UZW2UHI", "variant_id": "VMOBIQMUGZL58TZUWC", "seller_rating": "3", "selling_price": 100000, "total_inventory_count": 0, "selling_price_currency": "SAR", "seller_name": "Entity-1", "seller_id": null, "seller_type": null, "inventory_list": [{ "inventory_id": "INVdevgjg7lledw", "inventory_city": "string", "stock_count": 2340, "dispatch_days": 0, "dispatch_hours": 0 }], "max_limit_per_user": "4", "accepts_returns": "true", "max_days_to_return": "1", "shipping": { "listing_id": "5aed6d235ccd97388e58840b", "warehouse_id": null, "shipping_fees": 0, "shippable_countries": ["DUB"] }, "active": false } }, { "product_details_vo": { "cached_product_details": { "catalog_id": "CMOBUHBJAD13WDDQZ3", "product_id": "PMOBHYMAZMTXFI0WF6", "item_type_name": "mobile", "media": { "gallery_media": [{ "type": "IMAGE", "url": "catalog/mobile/PMOBHYMAZMTXFI0WF6/GALLERY/MEDIAGSSFYNTOJQRQRW1STNNA2L/apple-iphone-x-mqa82hn-a-original-imaeyysgmypxmazk.jpeg", "caption": " ", "order": "1", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBHYMAZMTXFI0WF6/GALLERY/MEDIAGSSFYNTOJQRQRW1STNNA2L/apple-iphone-x-mqa82hn-a-original-imaeyzyf8dyfgaaq.jpeg", "caption": " ", "order": "2", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBHYMAZMTXFI0WF6/GALLERY/MEDIAGSSFYNTOJQRQRW1STNNA2L/apple-iphone-x-mqa82hn-a-original-imaeyzzw2zrxkwug.jpeg", "caption": " ", "order": "3", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBHYMAZMTXFI0WF6/GALLERY/MEDIAGSSFYNTOJQRQRW1STNNA2L/apple-iphone-x-mqa82hn-a-original-imaeyysge4tu4gva.jpeg", "caption": " ", "order": "4", "restricted": false }] }, "rich_product_desc": [], "attribute_map": { "color": { "identity": true, "name": "color", "display_string": "color", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Space Grey" }] }, "calculated_highlights": { "name": "calculated_highlights", "display_string": "Highlights", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "| 256.00 GB |" }, { "value": "12MP Rear Camera | 7MP Front Camera" }, { "value": "A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor" }] }, "internal_storage": { "identity": true, "name": "internal_storage", "display_string": "internal_storage", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "256.00" }] }, "calculated_display_name": { "name": "calculated_display_name", "display_string": "Display Title", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Apple iPhone X (Space Grey, 256.00 GB)" }] }, "ram": { "name": "ram", "display_string": "ram", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999.00" }] } } }, "cached_variant": { "VMOBZLS5HBOJTTMS9I": { "attribute_map": {} } } }, "listing": { "listing_id": "5aed6d345ccd97388e58840c", "product_id": "PMOBHYMAZMTXFI0WF6", "variant_id": "VMOBZLS5HBOJTTMS9I", "seller_rating": "3", "selling_price": 100000, "total_inventory_count": 0, "selling_price_currency": "SAR", "seller_name": "Entity-1", "seller_id": null, "seller_type": null, "inventory_list": [{ "inventory_id": "INVdevgjg7lledw", "inventory_city": "string", "stock_count": 2340, "dispatch_days": 0, "dispatch_hours": 0 }], "max_limit_per_user": "4", "accepts_returns": "true", "max_days_to_return": "1", "shipping": { "listing_id": "5aed6d345ccd97388e58840c", "warehouse_id": null, "shipping_fees": 0, "shippable_countries": ["DUB"] }, "active": false } }, { "product_details_vo": { "cached_product_details": { "catalog_id": "CMOBUHBJAD13WDDQZ3", "product_id": "PMOBIHQMFX5BRGTUVZ", "item_type_name": "mobile", "media": { "gallery_media": [{ "type": "IMAGE", "url": "catalog/mobile/PMOBIHQMFX5BRGTUVZ/GALLERY/MEDIATE5H2UQC9CD5F4B3QFGVFT/apple-iphone-x-mqa92hn-a-original-imaeyysgqbg8qmhn.jpeg", "caption": " ", "order": "1", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBIHQMFX5BRGTUVZ/GALLERY/MEDIATE5H2UQC9CD5F4B3QFGVFT/apple-iphone-x-mqa92hn-a-original-imaeyzzvaqggkygg.jpeg", "caption": " ", "order": "2", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBIHQMFX5BRGTUVZ/GALLERY/MEDIATE5H2UQC9CD5F4B3QFGVFT/apple-iphone-x-mqa62hn-a-original-imaeyzzc2akw459y.jpeg", "caption": " ", "order": "3", "restricted": false }, { "type": "IMAGE", "url": "catalog/mobile/PMOBIHQMFX5BRGTUVZ/GALLERY/MEDIATE5H2UQC9CD5F4B3QFGVFT/apple-iphone-x-mqa62hn-a-original-imaeyysgjbe3qzwz.jpeg", "caption": " ", "order": "4", "restricted": false }] }, "rich_product_desc": [], "attribute_map": { "color": { "identity": true, "name": "color", "display_string": "color", "attribute_category_name": "General", "visible": true, "searchable": true, "filterable": false, "attribute_values": [{ "value": "Silver" }] }, "calculated_highlights": { "name": "calculated_highlights", "display_string": "Highlights", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "| 64.00 GB |" }, { "value": "12MP Rear Camera | 7MP Front Camera" }, { "value": "A11 Bionic Chip with 64-bit Architecture, Neural Engine, Embedded M11 Motion Coprocessor" }] }, "internal_storage": { "identity": true, "name": "internal_storage", "display_string": "internal_storage", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "64.00" }] }, "calculated_display_name": { "name": "calculated_display_name", "display_string": "Display Title", "attribute_category_name": null, "visible": false, "searchable": false, "filterable": false, "attribute_values": [{ "value": "Apple iPhone X (Silver, 64.00 GB)" }] }, "ram": { "name": "ram", "display_string": "ram", "attribute_category_name": "Memory & Storage Features", "visible": true, "searchable": true, "filterable": true, "attribute_values": [{ "value": "-999.00" }] } } }, "cached_variant": { "VMOBH2VDYGOWHIUP3X": { "attribute_map": {} } } }, "listing": { "listing_id": "5aed6d445ccd97388e58840d", "product_id": "PMOBIHQMFX5BRGTUVZ", "variant_id": "VMOBH2VDYGOWHIUP3X", "seller_rating": "3", "selling_price": 100000, "total_inventory_count": 0, "selling_price_currency": "SAR", "seller_name": "Entity-1", "seller_id": null, "seller_type": null, "inventory_list": [{ "inventory_id": "INVdevgjg7lledw", "inventory_city": "string", "stock_count": 2340, "dispatch_days": 0, "dispatch_hours": 0 }], "max_limit_per_user": "4", "accepts_returns": "true", "max_days_to_return": "1", "shipping": { "listing_id": "5aed6d445ccd97388e58840d", "warehouse_id": null, "shipping_fees": 0, "shippable_countries": ["DUB"] }, "active": false } }], "country_code": "SAE", "product_id": "PMOBH2OXUVSUSTKUCP", "variant_id": null, "blocked": false }];

const getProduct = (options) => {
  const promise = new Promise(function (resolve, reject) {
    resolve();
  })

  return promise.then(() => {
    return { data: mydata };
  });

};

export default { getProduct };