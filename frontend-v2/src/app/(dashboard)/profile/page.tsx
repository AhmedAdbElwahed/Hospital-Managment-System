"use client";

import { useCurrentUser } from "@/hooks/useUser";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Calendar, MapPin, ShieldCheck, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-120px)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-red-50 text-red-600 rounded-xl">
        Failed to load user profile. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <Card className="border-indigo-100/50 shadow-xl shadow-indigo-50/50 overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-blue-600" />
            <CardContent className="pt-0 -mt-12 flex flex-col items-center">
              <div className="h-24 w-24 rounded-2xl bg-white p-1 shadow-lg">
                <div className="h-full w-full rounded-xl bg-indigo-600 flex items-center justify-center">
                  <User className="h-12 w-12 text-white" />
                </div>
              </div>
              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {user?.firstname} {user?.lastname}
              </h2>
              <p className="text-sm font-medium text-gray-400 uppercase tracking-tighter mt-1">
                {user?.roles || "Medical Staff"}
              </p>
              <div className="flex gap-2 mt-4">
                <div className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck className="h-3 w-3" />
                  Verified
                </div>
                <div className="px-3 py-1 bg-emerald-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  Active
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-100/50 shadow-lg shadow-indigo-50/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Account Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-xs font-medium h-10 border-indigo-50 hover:bg-indigo-50 hover:text-indigo-600">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start text-xs font-medium h-10 border-rose-50 hover:bg-rose-50 hover:text-rose-600 text-rose-500">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 w-full space-y-6">
          <Card className="border-indigo-100/50 shadow-xl shadow-indigo-50/50">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>View and manage your account details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.firstname || ""} readOnly className="pl-10 bg-gray-50 border-gray-100 focus:ring-0" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">Last Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.lastname || ""} readOnly className="pl-10 bg-gray-50 border-gray-100" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.email || ""} readOnly className="pl-10 bg-gray-50 border-gray-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.phone || "Not provided"} readOnly className="pl-10 bg-gray-50 border-gray-100" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">Date of Birth</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.dob || "Not provided"} readOnly className="pl-10 bg-gray-50 border-gray-100" />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-gray-400 text-xs uppercase font-semibold">Home Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input value={user?.address || "Not provided"} readOnly className="pl-10 bg-gray-50 border-gray-100" />
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100 flex justify-end">
                <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 h-10 font-semibold rounded-xl transition-all shadow-lg shadow-indigo-200">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
