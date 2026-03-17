"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "./ui/switch";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [ads, setAds] = useState(false);
  const [functional, setFunctional] = useState(false);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      if (window.dataLayer) {
        window.dataLayer.push(arguments);
      }
    };

    const storedConsent = localStorage.getItem("cookie-consent");

    if (!storedConsent) {
      window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        functionality_storage: "denied",
      });

      setVisible(true);
    } else {
      const parsed = JSON.parse(storedConsent);
      if (typeof(parsed.analytics)==='boolean' ) {
        setAnalytics(parsed.analytics);
      }
      if (typeof(parsed.ads)==='boolean' ) {
        setAds(parsed.ads);
      }
      if (typeof(parsed.functional)==='boolean' ) {
        setFunctional(parsed.functional);
      }

      window.gtag("consent", "update", {
        analytics_storage: parsed.analytics ? "granted" : "denied",
        ad_storage: parsed.ads ? "granted" : "denied",
        ad_user_data: parsed.ads ? "granted" : "denied",
        ad_personalization: parsed.ads ? "granted" : "denied",
        functionality_storage: parsed.functional ? "granted" : "denied",
      });
    }
  }, []);

  const allowSelected = () => {
    const consent = {
      analytics,
      ads,
      functional,
    };

    window.gtag("consent", "update", {
      analytics_storage: analytics ? "granted" : "denied",
      ad_storage: ads ? "granted" : "denied",
      ad_user_data: ads ? "granted" : "denied",
      ad_personalization: ads ? "granted" : "denied",
      functionality_storage: functional ? "granted" : "denied",
    });

    localStorage.setItem("cookie-consent", JSON.stringify(consent));

    setVisible(false);
  };

  const accept = () => {
    const consent = {
      analytics: true,
      ads: true,
      functional: true,
    };

    window.gtag("consent", "update", {
      analytics_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      functionality_storage: "granted",
    });

    localStorage.setItem("cookie-consent", JSON.stringify(consent));

    setVisible(false);
  };

  const reject = () => {
    const consent = {
      analytics: false,
      ads: false,
      functional: false,
    };

    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
    });

    localStorage.setItem("cookie-consent", JSON.stringify(consent));

    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="bg-background fixed bottom-5 left-5 right-5 max-w-md rounded-2xl border p-4 shadow-lg z-50">
      <p className="font-semibold">🍪 Cookie Notice</p>

      <p className="text-muted-foreground mt-3 text-sm">
        We use cookies to analyze traffic and improve your experience.
      </p>

      <div className="mt-4 flex flex-col justify-between gap-2">
        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          onClick={reject}
        >
          Deny
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="w-full">
              Manage Cookies
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Manage Cookies</DialogTitle>
              <DialogDescription>
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. You can choose which cookies
                to accept.
              </DialogDescription>
            </DialogHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold">Essential Cookies</p>
                <p className="text-muted-foreground text-sm">
                  Required for the website to function. Cannot be disabled.
                </p>
              </div>
              <Switch
                defaultChecked
                disabled
                size="default"
                className="w-full min-h-0!"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold">Analytics Cookies</p>
                <p className="text-muted-foreground text-sm">
                  Help us understand how visitors interact with our website.
                </p>
              </div>
              <Switch
                checked={analytics}
                onCheckedChange={setAnalytics}
                size="default"
                className="w-full min-h-0!"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold">Advertising Cookies</p>
                <p className="text-muted-foreground text-sm">
                  Used to deliver personalized advertisements.
                </p>
              </div>
              <Switch
                checked={ads}
                onCheckedChange={setAds}
                size="default"
                className="w-full min-h-0!"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col items-start gap-1">
                <p className="font-semibold">Functional Cookies</p>
                <p className="text-muted-foreground text-sm">
                  Enable enhanced functionality like chat widgets and videos.
                </p>
              </div>
              <Switch
                checked={functional}
                onCheckedChange={setFunctional}
                size="default"
                className="w-full min-h-0!"
              />
            </div>

            <DialogFooter className="sm:justify-evenly w-full">
              <DialogClose asChild>
                <Button variant="destructive" onClick={reject}>Deny</Button>
              </DialogClose>
              <Button variant="outline" type="submit" onSubmit={allowSelected}>
                Allow Selected
              </Button>
              <Button type="submit" onClick={accept}>
                Allow All
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Button size="sm" onClick={accept} className="w-full">
          Allow all
        </Button>
      </div>
    </div>
  );
}
